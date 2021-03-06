import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }

    renderSurveys() {
        return this.props.surveys.map(survey => {
            return (
                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content white-text">
                        <button
                            className="waves-effect waves-light btn right"
                            onClick={() => this.props.deleteSurvey(survey._id)}
                        >
                            Delete
                        </button>
                        <span className="card-title">
                            {survey.title}
                        </span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On:{' '}
                            {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>
                            Yes: {survey.yes}
                        </a>
                        <a>
                            No: {survey.no}
                        </a>
                    </div>
                </div>
            );
        });
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, {
    fetchSurveys: actions.surveysActions.fetchSurveys,
    deleteSurvey: actions.surveysActions.deleteSurvey
})(SurveyList);
