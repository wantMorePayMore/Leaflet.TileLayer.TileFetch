# Leaflet.TileLayer.TileFetch
  使用自定义Fetch请求获取瓦片图层
## 安装
  ```
  npm install leaflet.tilelayer.tilefetch
  ```
## 参数
  基于TileLayer的参数，增加了`tileRequestParameters`参数,该参数为[fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)方法的初始化参数，支持function以及字面量形式
## 示例
 参考example/index.html;
  ```
L.TileLayer.tileFetch(
                'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                  tileRequestParameters: ()=>{
                      return {
                        cache:"default",
                        mode:'cors',
                        headers: {
                          'time': new Date().toISOString()
                        },
                      };
                  }
                }
            ).addTo(map);
```
或者字面量形式
  ```
L.TileLayer.tileFetch(
                'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                  tileRequestParameters: {
                    cache:"default",
                    mode:'cors',
                    headers: {
                      'token': 123
                    }
                  }
                }
            ).addTo(map);
```
