import React from 'react';
import {connect} from 'react-redux';
import UniformItem from './Uniform-Item';



class UniformList extends React.Component {
  render() {

    const uniforms = this.props.uniforms;
    console.log('uniforms is ', uniforms)
    return (
      <div id="kanban">
        {
            uniforms.map(uniform =>
            <UniformItem handleDelete={this.props.handleDelete}
              handleUpdate={this.props.handleUpdate}
              key={uniform.id} uniform={uniform}
            />)
        }
      </div>
    )
  }
}



export default UniformList;
