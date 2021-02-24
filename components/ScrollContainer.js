import React from 'react';
import {ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';


const ScrollContainer = ({loading, children, contentContianerStyle, refreshFn}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async() => {
        setRefreshing(true);
        await refreshFn();
        setRefreshing(false);
    };
    return(
        <ScrollView
            refreshControl = {
                <RefreshControl
                    refreshing = {refreshing}
                    onRefresh = {onRefresh}
                />
            }
            style = {{backgroundColor:'black'}}
            contentContianerStyle = {{
                flex: loading ? 1 : 0,
                justifyContent: loading ? "center" : "flex-start",
                ...contentContianerStyle
            }}
        >
            {loading ? (
                <ActivityIndicator color = 'white' size = 'small' />
            ) : (
                children
            )}
        </ScrollView>
    )
}

ScrollContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    contentContianerStyle: PropTypes.object,
    refreshFn:PropTypes.func
}

export default ScrollContainer;