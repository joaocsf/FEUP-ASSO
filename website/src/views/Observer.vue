<template>
  <page title="Observer" :description="description">
    
    <example class="mt-1" title="Input Reactivity">
      <span> One use case for this pattern is reactivity in webpages</span>
      <v-form> 
        <v-text-field
          :rules="rules"
          label="Text"
          v-model="demo1">>
        </v-text-field>
      </v-form>
      <div>
        Your Text:
      </div>
      <div>
        <v-layout row wrap>
          <v-flex class="white elevation-1" xs3 v-for="i in [1,2,3,4]" :key="i">
            .
            <box :text="demo1 + ' '"/>
          </v-flex>
        </v-layout>
      </div>
    </example>

    <example class="mt-2" title="Notifications">
      
    </example>
 </page>
</template>

<script>
import Page from '@/components/utils/Page'
import Box from '@/components/utils/Box'
import Example from '@/components/utils/Example'
export default {
  components: {Page, Box, Example},
  data() {
    return {
      description: 'The Observer Pattern is used when there is one-to-many relationship between objects such as if one object is modified, its dependent objects are to be notified automatically. Observer pattern falls under behavioral pattern category',
      rules: [
       v => !!v || 'Observer Alerted! This field is required',
       v => v.length <= 10 || 'Observer Alerted! Text higher than 10 characters' 
      ],
      demo1: ''

    }
  }

}
</script>

<style>

</style>
