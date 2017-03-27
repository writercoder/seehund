import React from 'react'

export default class PostPage extends React.Component {

  render() {
    const id = this.props.id;

    return <p>In Posts page with id: {id}</p>
  }

  // componentWillMount() {
  //   this.props.posts.fetch()
  // }
}