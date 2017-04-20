<template>
    <div>
        <h1>Trade or View your Stock Portfolio</h1>
        <h6>You may Save & Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day!</h6>
        <hr>
        <p>Your Funds: {{ funds | currency }}</p>
        <hr>
        <br>
        <br>
        <br>
        <h4>CREATED BY: </h4>
        <h6>Jennifer Crouch</h6>
        <h6>Zachary Fullmer</h6>
        <h6>Dax Kelson</h6>
        <h6>Justin Messenger</h6>
        <h6>Nelson Muhlestein</h6>
    </div>
</template>



<script>
   export default {
       computed: {
           funds() {
               console.log(this.$store.getters.funds);
               return this.$store.getters.funds;
           }
       }
   } 
</script>