function getError(url, option, xhr) {
    var msg;
    if (xhr.response) {
        msg = xhr.status + ' ' + (xhr.response.message || xhr.response);
    } else if (xhr.responseText) {
        msg = xhr.status + ' ' + xhr.responseText;
    } else {
        msg = 'fail to post ' + url + ' ' + xhr.status;
    }

    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = url;
    return err;
}

function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

module.exports = function upload(option) {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }

    var xhr = new XMLHttpRequest();
    var url = option.url;

    if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress && option.onProgress(e);
        };
    }

    var formData = new FormData();

    if (option.data) {
        Object.keys(option.data).forEach(function (key) {
            formData.append(key, option.data[key]);
        });
    }

    formData.append(option.fileFieldName, option.file);

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(url, option, xhr));
        }

        option.onSuccess(getBody(xhr));
    };

    xhr.open('post', url, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    var headers = option.headers || {};

    for (var item in headers) {
        if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
        }
    }
    xhr.send(formData);
    return xhr;
}