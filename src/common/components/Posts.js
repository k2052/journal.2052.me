import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changePost } from 'actions//posts'

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePost }, dispatch);
}

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.changePost = this.changePost.bind(this);
  }

  changePost(id) {
    this.props.changePost(id);
  }

  render () {
    let postsRows = []

    this.props.posts.map((post, index) =>  {
      postsRows.push(
        <li key={index}>
          <Link to={`/${post.slug}.html`} className="Posts__Post__Title" onClick={(e) => this.changePost(index)}>
            <h2>
              <div className="Posts__Post__Title__Span">{post.title}</div>
              <aside className="Posts__Post__Date">{post.date}</aside>
            </h2>
          </Link>
        </li>
      )
    })

    return (
      <ul className="Posts">
        {postsRows}
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
