import axios from 'axios';
import React, { Component } from 'react';
import Photo from '../Photo/Photo';
import css from './Photos.module.css';
import Utils from '../../Utils.js'

class Photos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pics: [],
            displayData: [],
            filteredPics: [],
            query: '',
        }
    }

    componentDidMount() {
        axios.get('/Lokenath/MyRepo/master/Test/package.json').then(res => {
            if (res.status === 200) {
                const { pics } = res.data;
                // console.log(pics)
                this.setState({ pics, displayData: Utils.chunkArray(pics) })
            }
        }).catch(err => {
            console.error('Error-', err)
        })
    }

    sort(key) {
        // console.log(key)
        const sorted = Utils.sortByKey(this.state.pics, key)
        let displayData = [];
        if (this.state.query) {
            displayData = Utils.chunkArray(this.filterPics(this.state.query))
        } else {
            displayData = Utils.chunkArray(sorted)
        }
        this.setState({ pics: sorted, displayData: displayData })
    }

    filterPics(query) {
        return this.state.pics.filter((i) => {
            return i.category.toLowerCase().includes(query.toLowerCase())
        })
    }

    search(query) {
        const filteredPics = this.filterPics(query)
        this.setState({ filteredPics, displayData: Utils.chunkArray(filteredPics), query })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <h2 className={`${css.headerBg} ${css.borderBottom}`}>Imaginary</h2>
                <div className={`${css.actionBar} ${css.borderBottom}`}>
                    <div className={css.sort}>
                        <span className={css.pointer}><u onClick={() => this.sort('likes')}>Most liked</u> | <u onClick={() => this.sort('comments')}>Most commented</u></span>
                    </div>
                    <div className={`${css.search}`}>
                        <input value={this.state.query} type="text" placeholder="Search Images..." onChange={(e) => { this.search(e.target.value) }}></input>
                    </div>
                </div>
                <div className={`${css.photos}`}>
                    <table className={`${css.padTop} ${css.center}`} >
                        <tbody>
                            {
                                this.state.displayData.map((i, idx) => {
                                    return <tr key={`tr${idx}`}>
                                        {
                                            i.map((j) => {
                                                return <td className={css.tdPad} key={j.id}>
                                                    <Photo data={j}></Photo>
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>)
    }
}
export default Photos;