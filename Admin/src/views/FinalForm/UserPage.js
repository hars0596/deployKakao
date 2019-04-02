import React, { Component } from 'react';
import UserForm from './UserForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../components/actions/flashMessages.js';
import { userFormRequest, isUserExists } from '../../components/actions/formvActions';
class UserPage extends Component {
    render() {
        const { userFormRequest, addFlashMessage, isUserExists } = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <UserForm
                        isUserExists={isUserExists}
                        userFormRequest={userFormRequest}
                        addFlashMessage={addFlashMessage} />
                </div>
            </div>
        );
    }
};

UserPage.propTypes = {
    userFormRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
}
export default connect(null, { userFormRequest, addFlashMessage, isUserExists })(UserPage);

