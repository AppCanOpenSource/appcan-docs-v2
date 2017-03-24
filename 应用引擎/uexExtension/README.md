# AppCan插件热更新

## 概述

AppCan应用插件热更新技术，是在引擎中实现JavaScript调用任何Object-C原生接口的组件，后台通过下发JS脚本可以实现如下功能：
1. 替换原有插件的Object-C代码，实时修复线上BUG。
2. 用JS代码实现整个插件功能，动态添加App功能。

## 实现功能

### 1. 实时修复线上BUG

例如线上 APP 有一段代码出现 bug 导致 crash：

```

@implementation JPTableViewController
...
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
  NSString *content = self.dataSource[[indexPath row]];  //可能会超出数组范围导致crash
  JPViewController *ctrl = [[JPViewController alloc] initWithContent:content];
  [self.navigationController pushViewController:ctrl];
}
...
@end


```

可以通过下发这样一段 JS 代码，覆盖掉原方法，修复这个 bug：

```

//JS
defineClass("JPTableViewController", {
  //instance method definitions
  tableView_didSelectRowAtIndexPath: function(tableView, indexPath) {
    var row = indexPath.row()
    if (self.dataSource().length > row) {  //加上判断越界的逻辑
      var content = self.dataArr()[row];
      var ctrl = JPViewController.alloc().initWithContent(content);
      self.navigationController().pushViewController(ctrl);
    }
  }
}, {})

```

### 2. 动态添加App功能

可以用于开发功能模块，把一部分业务完全用 JS 开发，再动态下发给客户端执行，让APP 同时拥有原生体验和动态特性。

## 注意事项

AppCan中一个完整的插件包括：插件库、配置文件(plugin.xml、xx.plist文件)、资源文件（插件本身的Bundle文件和引用的第三方Bundle文件）、第三方库。
插件的热修复功能，只能针对于插件库和资源文件进行热更新，而对于配置文件、第三方库不可进行热修复，必须提前预置到App中。

