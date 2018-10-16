<template>
  <div id="wrapper">
    <!--<img id="logo" src="~@/assets/logo.png" alt="electron-vue">-->
    <h1>Clip-clap</h1>
    <main>
      <div class="left-side">
        <span class="title">
          Instant clipboard converter
        </span>
        <div>Just copy text to clipboard in any application &amp; it will be converted.</div>
        <ul class="convert-rules">
          <li>
            <h3>Opening hours</h3>
            <ul>
              <li>
                <h4>Simple</h4>
                mf1018u1220 <span>to</span><br>
                Mo-Fr 10:00-18:00; Su 12:00-20:00
              </li>
              <li>
                <h4>Saturday, Sunday, spaces</h4>
                ms1018 a 1119 u1220 <span>to</span><br>
                Mo-Sa 10:00-18:00; Sa 11:00-19:00; Su 12:00-20:00
              </li>
              <li>
                <h4>Nooning</h4>
                mf10131418u1220 <span>to</span><br>
                Mo-Fr 10:00-13:00,14:00-18:00; Su 12:00-20:00
              </li>
              <li>
                <h4>Nooning can be at end</h4>
                mf8181314 <span>to</span><br>
                Mo-Fr 08:00-13:00,14:00-18:00
              </li>
              <li>
                <h4>If you forget to change cyrillic keyboard layout</h4>
                ьа8181314ф920 <span>to</span><br>
                Mo-Fr 08:00-13:00,14:00-18:00; Sa 09:00-20:00
              </li>
            </ul>
          </li>
          <li>
            <h3>Phones</h3>
            <ul>
              <li>
                <h4>Simple phone</h4>
                067 1234 567 <span>to</span><br>
                +38(067)1234 567
              </li>
              <li>
                <h4>Multiple phones</h4>
                067 1234 567 ; 099 2234 567 <span>to</span><br>
                +38(067)1234 567; +38(099)2234 567
              </li>
            </ul>
          </li>
        </ul>
        <!--<system-information></system-information>-->
      </div>

      <!--<div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
        </div>
      </div>-->
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import clipboardWatcher from '@/assets/js/watcher'
  import clipboardConverter from '@/assets/js/converter'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    mounted() {
      clipboardWatcher.addWatcher(clipboardConverter.convert)
    },
    methods: {
      open (link) {
        require('electron').shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  /*main > div { flex-basis: 50%; }*/

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
  
  .convert-rules {
    display: flex;
    width: 100%;
  }
  
  .convert-rules > li {
    width: 50%;
  }
  
  ul span {
    color: #999;
  }
</style>
