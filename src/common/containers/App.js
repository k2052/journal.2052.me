import React from 'react'
import { Link } from 'react-router'
import Github from 'icons//Github'
import Mail from 'icons//Mail'
import Rss from 'icons//Rss'
import Twitter from 'icons//Twitter'

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <header className="Header">
          <navigation>
            <Link to="/">Posts</Link>
            <a href="http://k2052.codes">About</a>
            <a href="https://github.com/k2052">
              <Github />
            </a>
            <a href="https://twitter.com/k_2052">
              <Twitter />
            </a>
            <a href="mailto:k@2052.me">
              <Mail />
            </a>
            <a href="/rss.xml">
              <Rss />
            </a>
          </navigation>
        </header>

        <section className="Main">
          {this.props.children}
        </section>

        <footer>
          <hr />
          <div className="CopyAndCommnets">
            K-2052 is a developer by day, sorta designer by night and asleep by morrning.
            If you want to reach him for comments you can tweet <a href="https://twitter.com/k_2052">@k_2052</a> or email <a href="mailto:k@2052.me">k@2052.me</a>. He loves feedback! Just don't use the third person, he hates that.
          </div>
        </footer>
      </div>
    )
  }
}

export default App;
