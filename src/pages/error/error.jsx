import React from 'react';
import { get, isEmpty } from 'lodash';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// styles
import useStyles from './styles';

// logo
import logo from 'images/logo.svg';
import { useSelector } from 'react-redux';
import { selectLocale } from 'store/selectors';

const pages = {
    '/500.html': {
        status: '500',
        title: 'admin.common.serverError.title',
        subtitle: 'admin.common.serverError.subtitle',
        link: null,
    },
    '/403.html': {
        status: '403',
        title: 'admin.common.error403.title',
        subtitle: 'admin.common.error403.subtitle',
        link: '/',
        linkTitle: 'admin.common.error.btn.home',
    },
    '/401.html': {
        status: '401',
        title: 'admin.common.error401.title',
        subtitle: 'admin.common.error401.subtitle',
        link: '/login',
        linkTitle: 'admin.common.error.btn.login',
    },
    default: {
        status: '404',
        title: 'admin.common.error404.title',
        subtitle: 'admin.common.error404.subtitle',
        link: '/',
        linkTitle: 'admin.common.error.btn.home',
    },
    server: {
        status: '403',
        title: 'Oops! Something went wrong',
        subtitle: 'Access denied',
        link: '/',
        linkTitle: 'Back to Home',
    },
};

export function Error(props) {
    const locale = useSelector(selectLocale) || {};
    const pathName = get(props, 'location.pathname', '');
    const page = isEmpty(locale) ? pages.server : pages[pathName] || pages.default;
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <div className={classes.logotype}>
                <img className={classes.logotypeIcon} src={logo} alt="logo" />
                <Typography variant="h3" color="secondary" className={classes.logotypeText}>
                    HutBot Admin
                </Typography>
            </div>
            <Paper classes={{ root: classes.paperRoot }}>
                <Typography variant="h1" color="primary" className={classnames(classes.textRow, classes.errorCode)}>
                    {page.status}
                </Typography>
                <Typography variant="h5" color="primary" className={classes.textRow}>
                    {get(locale, page.title, pages.server.title)}
                </Typography>
                <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classnames(classes.textRow, classes.safetyText)}>
                    {get(locale, page.subtitle, pages.server.subtitle)}
                </Typography>
                {page.link && (
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={page.link}
                        size="large"
                        className={classes.backButton}>
                        {get(locale, page.linkTitle, pages.server.linkTitle)}
                    </Button>
                )}
            </Paper>
        </Grid>
    );
}
