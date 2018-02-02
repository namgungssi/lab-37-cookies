import React from 'react';
import UniformCreate from './Uniform-Create';



class UniformItem extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        submitText: 'Update',
        formState: 'inactive',
        submitState: 'hidden'
      }
    }

    render() {
      return (
        <div className="uniform-item">
          <header id="uniformHeader">
            <UniformCreate handler={this.props.handleUpdate}
             handleDelete={this.props.handleDelete}
             uniform={this.props.uniform}
             submitText={this.state.submitText}
             formState={this.state.formState}
             submitState={this.state.submitState}
            />
          </header>
        </div>
      )
    }
}



export default UniformItem;
