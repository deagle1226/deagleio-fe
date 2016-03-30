import React from 'react'
import Layout from 'common/Layout'

const Container = React.createClass({
    render() {
        return (
            <Layout data={window.DATA}>
                {React.cloneElement(this.props.children, {...window.DATA})}
            </Layout>
        )
    }
})

export default Container
