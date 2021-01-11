<template>
  <div class="home container pt-4">
    <h2>Blob Picture and File Uploded</h2>
    <form v-on:submit.prevent="formSubmit">
      
      <div class="input-group mb-3">
        <label for="picture">Picture Uplode</label>
        <div class="custom-file ml-2">
          <input type="file" ref="picture" accept=".png,.jpeg,.jpg"  class="custom-file-input" id="inputGroupFile01">
          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
      </div>

      <div class="input-group mb-3">
        <label for="file">File Uplode</label>
        <div class="custom-file  ml-4">
          <input type="file" ref="file"   class="custom-file-input" id="inputGroup">
          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
      </div>
       <button type="submit" class="btn btn-primary float-right"><span class="fa fa-check"></span>Submit</button>
    </form>
    <table class="table container" v-if="is_show">
      <thead>
        <tr>
          <th scope="col">Picture</th>
          <th scope="col">File</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img /></td>
          <td><a @click="downlode">Downlode File</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import  { http, httpFile } from "../http-common";

export default {
  name: "Home",
   data () {
      return {
        formDataUplode: {
          picture: '',
          file: ''
        },
        is_show: false,
        fileBlob: ''
       
      }
    },
  methods:{
   async formSubmit(){
       let formData = new FormData();  
       this.formDataUplode.picture = this.$refs['picture'].files[0];
       this.formDataUplode.file = this.$refs['file'].files[0];

       formData.append('picture', this.formDataUplode.picture);
       formData.append('file', this.formDataUplode.file);
        try{
            
              await httpFile().post('/uplode-file', formData).then( res => {
                  if(res.data.validation != null){
                    res.data.validation.picture ? alert(res.data.validation.picture[0]) :'';
                    res.data.validation.file ? alert(res.data.validation.file[0]) :'';
                  }else if(res.data.success) {
                        alert(res.data.success);
                      this.reciveData(res.data.data.id);
                  }                       
              }); 
                this.formDataUplode = {picture: '', file_send: ''  };

        }
        catch (error){
              console.log(error);
        }
    },

    async reciveData(id){

       await http().get('/get-file',{params: { Id: id} }).then( res => {
                console.log(res.data.success.picture);
                var image = document.createElement('img');
                image.src =  res.data.success.picture;
                image.style = "width:300px; height:300px; padding-left:10px";
                document.body.appendChild(image);

                this.fileBlob = res.data.success.file;
                this.is_show = true;                    
        }); 
    },
    downlode(){
      var a = document.createElement("a");
      document.body.appendChild(a);
      var  blob = new Blob([this.fileBlob], {type: "text/json;charset=utf-8"}),
      url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'my-configurations.json';
      a.click();
      window.URL.revokeObjectURL(url);
    }
    
  }
 
};
</script>
