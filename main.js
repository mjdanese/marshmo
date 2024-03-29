Vue.component('navtop', {
  template: `

  <div>
    <h1><a class='titleRef' href='index.html'>marshmo's blawg</a></h1><br>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-23 / These</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-22 / Are</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-21 / Placeholder</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-20 / Posts</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-19 / For</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-18 / Future</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-17 / Use</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-16 / By</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-15 / Marshmo</a>
    <a href="/2021-09-14" class="btn btn-outline-dark btn-sm">2021-09-14 / Cat</a>
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
