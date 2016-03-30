import React from 'react'

const Layout = React.createClass({
    render() {
        return (
            <main>
                {this.props.children}
            </main>
        )
    }
})

export default Layout
