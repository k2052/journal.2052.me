import React from 'react'
import { connect } from 'react-redux'
import Highlight from 'react-highlight'

function mapStateToProps(state) {
  return {
    title: state.post.title,
    date: state.post.date,
    body: state.post.contents
  }
}

class Post extends React.Component {
  createMarkup() {
    return {__html: this.props.body};
  };

  render () {
    const { title, date, body } = this.props;

    return (
      <article className="Post">
        <header>
          <h1 className="Post__title">{title}</h1>
          <aside className="Post__Date">
            {date}
          </aside>
        </header>
        <div className="Post__Body markdown-body">
          <Highlight innerHTML={true}>
            {this.props.body}
          </Highlight>
        </div>
      </article>
    )
  }
}

export default connect(mapStateToProps)(Post);
