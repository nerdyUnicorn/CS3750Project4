<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Project 4 Stock Ticker</router-link>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse">
        <ul v-if="loginStatus" class="nav navbar-nav">
          <router-link to="/stocklist" activeClass="active" tag="li"><a>Stocks List</a></router-link>
          <router-link to="/addstocks" activeClass="active" tag="li"><a>Add Stocks</a></router-link>
          <router-link to="/managestocks" activeClass="active" tag="li"><a>Money Management</a></router-link>
          <router-link to="/stockview" activeClass="active" tag="li"><a>Stock View</a></router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <template v-if="loginStatus">
            <li><a href="/users/logout">Logout</a></li>
          </template>
          <template v-else>
            <li><a href="/users/login">Login</a></li>
            <li><a href="/users/register">Register</a></li>
          </template>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</template>

<script>
  export default {
    computed: {
      loginStatus() {
        return this.$store.getters.loginStatus;
      }
    }
  }
</script>