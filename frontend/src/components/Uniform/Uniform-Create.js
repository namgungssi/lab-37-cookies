import React from 'react';
import {Link} from 'react-router-dom';



class UniformCreate extends React.Component {
  constructor(props) {

    super(props);

    this.state = this.props.uniform || {name:'', description:''},

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.formState = this.props.formState;
    this.submitState = this.props.submitState;
    this.deleteButton = this.props.submitText !== 'Update' ? 'invisible' : '';
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.handler( Object.assign({}, this.state));
    if(this.props.submitText !== 'Update') this.setState({name: '', description: ''});
  }


  handleChange(e) {
    this.setState({[e.target.name]:(e.target.value)});
  }


  render() {
    return (

      <form id="formDefault" onSubmit={this.handleSubmit} >
      <li id="logoutButton"><Link id='logoutLink' to='/'>Logout</Link></li>
      <div id="UniformCreate">
      <input
        className={this.formState}
        id="uniformName"
        type="text"
        name="name"
        value={this.state.name}
        required
        placeholder="uniform"
        onChange={this.handleChange}
      />

      <input
        className={this.formState}
        id="uniformDescrip"
        type="text"
        name="description"
        value={this.state.description}
        required
        placeholder="description"
        onChange={this.handleChange}
      />

      <a id='deleteButton' href="#" onClick={()=>this.props.handleDelete(this.props.uniform._id)}>X</a>
      </div>

      <input id='uniformSubmitButton'
        type='submit'
        className={this.submitState}
        value={this.props.submitText}/>
      </form>
    )
  }
}



export default UniformCreate;
