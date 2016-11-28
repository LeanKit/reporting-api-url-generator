import React from "react";
import Navigation from "./Navigation";
import { clipboard } from "electron";

const $ = jQuery = global.$ = global.jQuery = require( "jquery" );

class Home extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			hostname: "",
            domain: "",
            emailAddress: "",
            password: "",
            dataSource: "cards",
            dataFormat: "csv",
            url: "...generate me using the form above...",
			text: "WUT UP"
		};
		this.generateUrl = this.generateUrl.bind(this);
	}

	onHostnameChange( e ) {
		this.setState( { hostname: e.target.value } );
	}

    onDomainChange( e ) {
        this.setState( { domain: e.target.value } );
    }

    onEmailAddressChange( e ) {
        this.setState( { emailAddress: e.target.value } );
    }

    onPasswordChange( e ) {
        this.setState( { password: e.target.value } );
    }

    onDataSourceChange( e ) {
        this.setState( { dataSource: e.target.value } );
    }

    onDataFormatChange( e ) {
        this.setState( { dataFormat: e.target.value } );
    }

    selectUrl ( e ) {
        e.target.select();
        e.preventDefault();
    }

    onCopyToClipboard( e ) {
        e.stopPropagation();
		e.preventDefault();
		let url = this.state.url;
		clipboard.writeText( url );
        alert( "Copied to the clipboard!" );
		// new Notification( "Url Generator", { body: "Copied to clipboard!" } );
    }

    generateUrl( e ) {
        if (this.state) {
            //alert('got state!');
            var baseUrl = 'https://' + this.state.hostname + '.' + this.state.domain + '/io/reporting';
            var authUrl = baseUrl + '/auth';
            var authData = {email: this.state.emailAddress, password: this.state.password, accountName: this.state.hostname};
            var dataSource = this.state.dataSource;
            var dataFormat = this.state.dataFormat;
            var generatedUrl = "";
            console.log('%j', authData);
            $.ajax({
                url: authUrl,
                type: "POST",
                data: JSON.stringify(authData),
                dataType: "json",
                contentType: "application/json",
                success: (response) => {
                    var token = response.token;
                    generatedUrl = baseUrl + '/export/' + dataSource + '.' + dataFormat + '?token=' + token;
                    this.setState( { url: generatedUrl } );
                    // $('input[name="url"]').val(generatedUrl);
                },
                error : (request, textStatus, errorThrown) => {
                    console.log('status ' + textStatus);
                    console.log('error ' + errorThrown);
                    alert('An error occurred while generating your URL. Please try again.')
                }
            })
        } else {
            alert('nope');
        }
        e.preventDefault();
    }

	render() {
		return (
			<div>
				<Navigation />
				<div className="container-fluid" id="main">
					<form onSubmit={ this.generateUrl }>
						<div className="input-group">
                            <label htmlFor="hostname">Hostname:</label>
							<input type="text"
								value={ this.state.hostname }
								onChange={ this.onHostnameChange.bind( this ) }
								className="form-control"
								placeholder="mycompany"
								name="hostname" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="domain">Domain:</label>
                            <input type="text"
                                   value={ this.state.domain }
                                   onChange={ this.onDomainChange.bind( this ) }
                                   className="form-control"
                                   placeholder="leankit.com"
                                   name="domain" />
						</div>
                        <div className="input-group">
                            <label htmlFor="emailAddress">Email Address:</label>
                            <input type="text"
                                   value={ this.state.emailAddress }
                                   onChange={ this.onEmailAddressChange.bind( this ) }
                                   className="form-control"
                                   placeholder="me@mycompany.com"
                                   name="emailAddress" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                   value={ this.state.password }
                                   onChange={ this.onPasswordChange.bind( this ) }
                                   className="form-control"
                                   name="password" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="dataSource">Data Source:</label>
                            <select name="dataSource"
                                    value={ this.state.dataSource }
                                    onChange={ this.onDataSourceChange.bind( this ) }>
                                <option value="cards">Current Cards</option>
                                <option value="cardpositions">Card Lane History</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="dataFormat">Data Format:</label>
                            <select name="dataFormat"
                                    value={ this.state.dataFormat }
                                    onChange={ this.onDataFormatChange.bind( this ) }>
                                <option value="csv">Comma-separated values (.csv)</option>
                                <option value="tab">Tab-delimited values (.tab)</option>
                                <option value="json">Javascript Object Notation (.json))</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <input type="submit" className="submit-button" value="Generate URL" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="url">URL:</label>
                            <input type="url"
                                   value={ this.state.url }
                                   readOnly="readOnly"
                                   className="form-control"
                                   onFocus={ this.selectUrl }
                                   name="url" />
                        </div>
                        <div className="input-group">
                            <div className="btn submit-button" onClick={this.onCopyToClipboard.bind( this )}><i className="glyphicon glyphicon-copy"></i> Copy to the Clipboard</div>
                        </div>
					</form>
				</div>
			</div>
		);
	}
}

// Home.propTypes = {
// 	rating: React.PropTypes.string,
// 	text: React.PropTypes.string,
// 	onRatingChange: React.PropTypes.func,
// 	onSearchTextChange: React.PropTypes.func,
// 	onSearch: React.PropTypes.func
// };

export default Home;
