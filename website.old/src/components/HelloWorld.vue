<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap">
      <div
        class="w-full mb-8 lg:mb-0 lg:w-1/2 xl:w-2/3 xl:pr-56 text-left container mx-auto"
      >
        <h1
          class="text-3xl sm:text-5xl lg:text-6xl text-white mt-4 font-medium"
        >
          Training, Research and Innovation in
          <span class="text-yellow-600">Artificial Intelligence</span>
        </h1>
        <h2 class="text-xl mt-4 text-white">
          Tri-ai organisation is an NGO committed to revolutionising the
          training, research and innovation in artificial intelligence in
          Africa. 
        </h2>
       
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",

  data: function() {
    return {
      messenger: {
        name: "",
        location: "",
        email: "",
        message: ""
      },
      submitData: false
    };
  },
  methods: {
    // gatherFormData() {
    //   const data = new FormData()
    //   Object.keys(this.messenger)
    //         .forEach(key => data.append(key, this.messenger[key]))
    //   return data;
    // },
    // async saveToGoogleSheet() {
    //   const scriptURL =
    //     "https://script.google.com/macros/s/AKfycbw1HvvDv2a1zxtWcCuCMhjqBEyK1P2ovK60yeHB3z4n7_fnBiw/exec";
    //   try {
    //     const response = await fetch(scriptURL, {
    //       method: "POST",
    //       body: this.gatherFormData()
    //     });
    //     const data = await response.json();
    //     // reset form fields: could move this to a method and not repeat the initial object again.
    //     this.submitData = true;
    //     this.messenger = {
    //       name: "",
    //       location: "",
    //       email: "",
    //       message: ""
    //     };
    //     console.log("Success!", data);
    //   } catch (error) {
    //     console.error("Error!", error.message);
    //   }
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

/* btn hover style: hover:bg-yellow-700 */
</style>
