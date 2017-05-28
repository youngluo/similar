## simarkdown (fork by [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor))

### 安装

通过 npm
```
npm install simarkdown --save
```

### 配置(以下是更改部分)

- promptURLs(废弃)
- autosave.delay(废弃)
- imageUploadConfig(新增，可实现本地上传图片)
	- **url** [string]：图片上传地址
	- **fileFieldName** [string]：图片上传字段名
	- **data** [object]：上传需要携带的额外数据
	- **wrapperClass** [string]：指定弹出层的父类，默认为body
	- **withCredentials** [boolean]：是否携带跨域请求凭据
	- **headers** [object]：自定义请求头

### 使用详情见[simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)