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
          Africa. We have set out plans and agenda to achieve this.
        </h2>
        <p class="text-xl mt-4 text-yellow-600">
          Stay tuned or reach out to us via the contact form
        </p>
      </div>
      <div class="bg-gray-900 w-full lg:w-1/2 xl:w-1/3 py-2 container mx-auto">
        <p class="text-white" v-if="submitData === true">Message sent!</p>
        <p class="text-gray-400 px-2" v-else>
          <a href="https://aisaturdayslagos.github.io/" target="_blank" class="text-yellow-600">AISaturdays Lagos</a> is one of the subsidiaries of Tri-ai. If you wish
          to start a version of AI saturdays in an African city near you, please
          fill the form below:
        </p>
        <form
          class="px-4 sm:px-8 pt-6 pb-8 text-left"
          name="submit-to-google-sheet"
          ref="contactForm"
          @submit.prevent="saveToGoogleSheet"
        >
          <div class="mb-4">
            <label
              class="block text-gray-300 text-sm font-bold mb-2"
              for="username"
              >What's your name?</label
            >
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="messenger.name"
              type="text"
              placeholder="Your name" required disabled
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-300 text-sm font-bold mb-2"
              for="username"
              >Your location?</label
            >
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="messenger.location"
              type="text"
              placeholder="Your location" required disabled
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-300 text-sm font-bold mb-2"
              for="password"
              >Email, so we get back to you</label
            >
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="messenger.email"
              type="email"
              placeholder="Your email address" required disabled
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-300 text-sm font-bold mb-2"
              for="password"
              >Do you have any message for us?</label
            >
            <textarea
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="messenger.message"
              placeholder="Your message" disabled
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-yellow-600 text-white font-bold cursor-not-allowed py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit" disabled
            >
              Send message
            </button>
          </div>
          <div>This form is currently not available. Have an inquiry? Send us an email at <a href="mailto:hello@tri-ai.org" class="text-yellow-600">hello@tri-ai.org</a></div>
        </form>
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
