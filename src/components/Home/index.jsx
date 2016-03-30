import React from 'react'
import map from 'lodash/map'

const Home = React.createClass({
    render() {
        const { articles } = this.props
        return (
            <section>
                {map(articles, (article, idx) => (
                    <article key={idx}>
                        <h2>{article.name}</h2>
                        <p>{article.deck}</p>
                    </article>
                ))}
            </section>
        )
    }
})

export default Home
