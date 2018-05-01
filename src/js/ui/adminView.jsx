"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button, ButtonGroup} from 'reactstrap';
import UserOrcidLink from 'ui/userOrcidLink';

class AdminView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.renderUserList = this.renderUserList.bind(this);
        this.renderUserItem = this.renderUserItem.bind(this);
        this.renderRoleToggle = this.renderRoleToggle.bind(this);
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    userHasRole(user, checkRole) {
        return user.roles.find(role => role.name == checkRole) ? true : false;
    }

    renderRoleToggle(user, role) {
        if (this.userHasRole(user, role)) {
            return (
                <Button onClick={() => this.props.removeRole(user.id, role)} color="success">
                    <span className="fa fa-check"/> {role}
                </Button>
            );
        } else {
            return (
                <Button onClick={() => this.props.addRole(user.id, role)} color="danger">
                    <span className="fa fa-times"/> {role}
                </Button>
            );
        }
    }

    renderUserItem(item, i) {
        return (
            <ListGroupItem key={i}>
                <Row>
                    <Col sm={3}>
                        <UserOrcidLink user={item} />
                    </Col>
                    <Col sm={2}>
                        {item.email_address ?
                            <a href={`mailto:${item.email_address}`}>{item.email_address}</a> :
                            <em>No email</em>}
                    </Col>
                    <Col className="text-center">
                        <ButtonGroup>
                            {this.renderRoleToggle(item, 'Researcher')}
                            {this.renderRoleToggle(item, 'Curator')}
                            {this.renderRoleToggle(item, 'Admin')}
                        </ButtonGroup>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    renderUserList() {
        return (
            <ListGroup className="list-group-flush">
                {this.props.usersList.map(this.renderUserItem)}
            </ListGroup>
        );
    }

    renderLoading() {
        return (
            <div className="text-center py-3">
                <span className="fa fa-spin fa-refresh fa-3x" />
            </div>
        );
    }

    render() {
        return (
            <Container fluid className="mt-3">
                <Row className="justify-content-md-center">
                    <Col md="10">
                        <Card className="page-card">
                            <CardHeader>
                                <span className="fa fa-file" /> Users
                            </CardHeader>
                            <CardBody className="p-0">
                                {this.props.loadingUsersList ? this.renderLoading():
                                    this.renderUserList()}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

AdminView.propTypes = {
    loadUsers: PropTypes.func,
    usersList: PropTypes.arrayOf(React.PropTypes.object),
    loadingUsersList: PropTypes.bool,
};

AdminView.defaultProps = {
    loadUsers: () => {},
    addRole: () => {},
    removeRole: () => {},
    usersList: [],
    loadingUsersList: true
};

export default AdminView;
