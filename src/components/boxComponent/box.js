import React from 'react';
import { Link } from 'react-router-dom'

// TEMPLATE DE BOX
class Box extends React.Component {
    render() {
        let { title, content } = this.props;
        return (
            <div className="box">
                <div className="title">
                    {title}
                    {this.props.closeBtn === true && <Link className="close" to="/">x</Link>}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
        );
    }
}

export default Box;