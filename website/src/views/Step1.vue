<template>
  <page>
    <v-layout row warp>
      <v-flex xs6>
        <h1>Title</h1>

        <p>
          Text
        </p>
        
          <code>
            var person = {
              firstName : "John",
              lastName  : "Doe",
              age       : 50,
              eyeColor  : "blue"
            };

            document.getElementById("demo").innerHTML =
            person.firstName + " is " + person.age + " years old, oh so old.";
          </code>
       
      </v-flex>

      <v-flex xs6>
        Canvas/other thingys go here
      </v-flex>
    </v-layout>
  
  </page>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style>
  page {
    text-align: left;
  }

  code {
    display: block;

  }
</style>

