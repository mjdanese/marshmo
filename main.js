Vue.component('navtop', {
  template: `

  <div>
    <h1><a class='titleRef' href='index.html'>mdanese</a></h1><br>
    <button @click='sendUpdate' class="btn btn-dark btn-sm">Random</button>
    <a href="/archive" class="btn btn-dark btn-sm">Archive</a>
    <a href="/2021-09-14" class="btn btn-dark btn-sm">2021-09-14</a>
    <br><br>
  </div>

  `,
  methods: {
    sendUpdate() {
      this.$emit('update-script')
    }
  }
})

Vue.component('navbtm', {
  template: `
  <div class="footer">
    <div class="footer contents">
      <a href="https://github.com/mjdanese/mdanesecom"
      target="_blank"
      class="btn btn-outline-light btn-sm">Github</a>
      <a href="https://www.instagram.com/mdanese/"
      target="_blank"
      class="btn btn-outline-light btn-sm">IG</a>
      <a class="btn btn-outline-light btn-sm"
      data-toggle="collapse"
      href="#collapseContact"
      role="button"
      aria-expanded="false"
      aria-controls="collapseContact"
      onclick="collapseClick(this)"
      id="collapseContactButton">Contact</a>

      <div class="collapse" id="collapseContact">
        <br>
        <div class="card dark-background">
          <br>
          <p>Marshall Danese</p>
          <a href="mailto:marshalldanese@gmail.com"
          class="dark-background-link"
          style="color:white;">marshalldanese@gmail.com</a>
          <a href="https://www.linkedin.com/in/mjdanese/"
          target="_blank"
          style="color:white;">LinkedIn</a>
          <br>
        </div>
        <br>
      </div>
    </div>
  </div>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    title: 'Cascades ',
    description: 'Another take on noisy lines in D3.',
    scripts: ['archive/d3/cascades1.js'],
    number: 4
  },
  methods: {
    updateWork: function(){
      this.number += 5
      this.scripts.push('archive/d3/cascades1.js')
      this.scripts.splice(0,1)
      cascades1()
    }
  }
})
