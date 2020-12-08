<template>
  <div class="test">
    <div>

      <input type="file" id="file" name="file" />
      <a @click="upload()" href="javascript:;">上传</a>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

      this.getOssToken();
    },
    methods: {
      //获取上传通行证
      getOssToken(){
        var _self = this;
        this.$http.get('/api/v1/alioss/sign').then(function(res) {
          if(res.data.code === 200){
            _self.aliyunOssToken = res.data.data;
          }else{
            _self.$message.error(res.data.message);
          }
        }).catch(function(error){
          console.log(error);
        })
      },

      upload() {
        var _self = this;
        var getSuffix = function (fileName) {
          var pos = fileName.lastIndexOf('.');
          var suffix = '';
          if (pos !== -1) {
            suffix = fileName.substring(pos);
          }
          return suffix;
        }

        const file = $('#file').val();
        if (file.length === 0) {
          alert('请选择文件');
        }

        var filename = new Date().getTime() + getSuffix(file);
        var formData = new FormData();

        //注意formData里append添加的键的大小写
        formData.append('key', _self.aliyunOssToken.dir + filename); //存储在oss的文件路径
        formData.append('OSSAccessKeyId', _self.aliyunOssToken.accessid); //accessKeyId
        formData.append('policy', _self.aliyunOssToken.policy); //policy
        formData.append('Signature', _self.aliyunOssToken.signature); //签名
//如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了

        formData.append('file', $('#file')[0].files[0]);
        formData.append('success_action_status', 200); //成功后返回的操作码


        var url = _self.aliyunOssToken.host;
        var fileUrl = _self.aliyunOssToken.host +'/'+ _self.aliyunOssToken.dir + filename;
        $.ajax({
          url: url,
          type: 'POST',
          data: formData,
          // async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (data) {
            console.log(fileUrl);
            console.log(data);
          },
          error: function (data) {
            console.log(data);
          }
        });
      }
    }
  }
</script>


<style scoped>

</style>
