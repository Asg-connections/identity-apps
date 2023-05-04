/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { CopyInputField, Message } from "@wso2is/react-components";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Icon, Progress, Segment, SemanticCOLORS, Sidebar } from "semantic-ui-react";
import { AppState, ConfigReducerStateInterface } from "../../../../../core";

const CustomIdentityProviderCreateWizardHelp = ():any => {
    const { t } = useTranslation();
    const config: ConfigReducerStateInterface = useSelector((state: AppState) => state.config);

    interface Content {
        id: number;
        title?: string;
        body: JSX.Element;
    }
    const quickHelpContent: Content[] = [
        {
            body: (
                <>
                    <Message
                        type="info"
                        header="Prerequisite"
                        content={
                            (<>
                                <p>
                                    <Trans
                                        i18nKey={
                                            "console:develop.features.authenticationProvider.templates." +
                                        "enterprise.oidc.preRequisites.description"
                                        }
                                    >
                                    Before you begin, register an application in the Identity Provider, and obtain a
                                        <strong> client ID & secret</strong>. Use the following URL as the <strong>
                                        Authorized Redirect URL</strong>.
                                    </Trans>
                                    <br />
                                    <br />
                                    <CopyInputField
                                        className="copy-input-dark"
                                        value={ config?.deployment?.customServerHost + "/commonauth" } />
                                    <br />
                                    <Icon name="info circle" />
                                    {
                                        t("console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                                        "preRequisites.hint")
                                    }
                                </p>
                            </>)
                        }
                    />
                </>
            ),
            id: 0
        },
        {
            body:(    
                <>
                    <p>
                        <Trans
                            i18nKey={
                                "console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                                "clientId.description"
                            }
                        >
                            Provide the client ID obtained from the identity provider.
                        </Trans>
                    </p>
                </>      
            ),
            id: 1,
            title: t("console:develop.features.authenticationProvider.templates.enterprise.oidc." +
            "clientId.heading")
        },
        {
            body:(    
                <>
                    <p>
                        <Trans
                            i18nKey={
                                "console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                                "clientSecret.description"
                            }
                        >
                            Provide the client secret obtained from the identity provider.
                        </Trans>
                    </p>
                </>      
            ),
            id: 2,
            title: t("console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                "clientSecret.heading")
        },
        {
            body:(    
                <>
                    <p>
                        <Trans
                            i18nKey={
                                "console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                                "authorizeEndpoint.description"
                            }
                        >
                            Provide the standard authorization endpoint URL of the identity provider.
                        </Trans>
                    </p>
                    <p>
                        <Trans
                            i18nKey={
                                "console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                                "authorizeEndpoint.example"
                            }
                        >
                            E.g., https://enterprise_domain/authorize
                        </Trans>
                    </p>
                </>      
            ),
            id: 3,
            title: t("console:develop.features.authenticationProvider.templates.enterprise.oidc." +
            "authorizeEndpoint.heading")
        },
        {
            body:(    
                <>
                    <p>
                        <Trans
                            i18nKey={
                                "console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                                "tokenEndpoint.description"
                            }
                        >
                            Provide the standard token endpoint URL of the identity provider.
                        </Trans>
                    </p>
                    <p>
                        <Trans
                            i18nKey={
                                "console:develop.features.authenticationProvider.templates.enterprise.oidc." +
                                "tokenEndpoint.example"
                            }
                        >
                            E.g., https://enterprise_domain/token
                        </Trans>
                    </p>
                </>      
            ),
            id: 4,
            title: t("console:develop.features.authenticationProvider.templates.enterprise.oidc." +
            "tokenEndpoint.heading")
        }
    ];

    const [ currentContent, setCurrentContent ] = useState(0);

    const handleClickPrevious = () => {
        setCurrentContent((c:number) => (c > 0 ? c - 1 : c));
    };
    const handleClickNext = () =>{
        setCurrentContent((c:number) => (c < quickHelpContent.length - 1 ? c + 1 : c));
    };
    const isPreviousButtonDisabled: boolean = currentContent === 0;
    const isNextButtonDisabled: boolean = currentContent === quickHelpContent.length - 1;
    const previousButtonColor: SemanticCOLORS = isPreviousButtonDisabled ? "grey" : "orange";
    const nextButtonColor: SemanticCOLORS = isNextButtonDisabled ? "grey" : "orange";
    const progress: number = (currentContent / (quickHelpContent.length - 1)) * 100;

    return (
        <Sidebar.Pushable>
            <Sidebar
                as={ Segment }
                animation="overlay"
                direction="left"
                visible
                icon="labeled"
                vertical
                className="idp-sidepanel-sidebar"
            >
                <div className="idp-sidepanel-content-large">
                    { quickHelpContent.map(({ id, title, body }:Content) => (
                        <div key={ id } className = { currentContent === id ? "visible" : "hidden" }>
                            <Segment
                                className="idp-sidepanel-segment">
                                <h2>{ title }</h2>
                                <p>{ body }</p>
                            </Segment>
                        </div>
                    )) }
                </div>
                <div className="idp-sidepanel-footer">
                    <Progress
                        percent={ progress }
                        indicating
                        className="idp-sidepanel-progress"
                        color="orange"
                        size="tiny"
                    />
                    <div className="idp-sidepanel-buttons">
                        <Button
                            icon="chevron left"
                            color={ previousButtonColor }
                            onClick={ handleClickPrevious }
                            className="idp-sidepanel-button"
                            disabled={ isPreviousButtonDisabled }
                        />
                        <Button
                            icon="chevron right"
                            color={ nextButtonColor }
                            onClick={ handleClickNext }
                            className="idp-sidepanel-button"
                            disabled={ isNextButtonDisabled }
                        >
                        </Button>
                    </div>
                </div>
            </Sidebar>
        </Sidebar.Pushable>
    );
};

/**
 * Default props for the component
 */
CustomIdentityProviderCreateWizardHelp.defaultProps = {
    "data-testid": "custom-app-create-wizard-help"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default CustomIdentityProviderCreateWizardHelp;
