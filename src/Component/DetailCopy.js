import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = "http://localhost:9091/seller-service/e-auction/api/v1/seller/show-bid";

function DetailCopy() {
    const [product, setProduct] = useState([])
    const [products, setProducts] = useState([])

    const [pId, setPId] = useState("")

    const getDetails1 = () => {
        axios.get(BASE_URL).then(response => response.data).then((res) => {
            setProducts(res);
        });
    };
    const getDetails = (id) => {
        console.log(typeof ("hi"));

        axios.get(BASE_URL + '/' + id).then(response => response.data).then((res) => {
            setProduct(res);
        });
    };

    return (
        <div className="card col-md-6 offset-md-3">

            <div>
                <button onClick={getDetails1}>Fetch Details</button>
                <select value={pId} onChange={e => setPId(e.target.value)}>
                    {(products).map(p => (
                        <option key={p.productId} value={p.productId}>
                            {p.name}
                        </option>)

                    )
                    }
                </select>
                <button style={{ marginLeft: "10px" }} onClick={getDetails(pId)} className="btn btn-info">Get </button>


            </div>


            <h3 className="text-center"> View Product Details</h3>
            <div className="card-body">

                <div className="row">
                    <label> Product Name:  <span> {product.name}</span> </label>
                </div>

                <div className="row">
                    <label>Short Description: <span> {product.shortDescription}</span></label>
                </div>

                <div className="row">
                    <label> Detailed Description: <span> {product.detailDescription}</span></label>
                </div>

                <div className="row">
                    <label> Category:  <span> {product.category}</span> </label>
                </div>

                <div className="row">
                    <label> Starting Price:  <span> {product.startingPrice}</span></label>
                </div>

                <div className="row">
                    <label> Bind End Date: <span> {product.bidEndDate}</span></label>
                </div>
            </div>
            <br></br>
            <div>
                <h3 className="text-center">Bids</h3>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Bid Amount</th>
                                <th> Name</th>
                                <th> Email</th>
                                <th> Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (product.bidsList || []).map(
                                    bid =>
                                        <tr key={bid.bidId}>
                                            <td> {bid.amount} </td>
                                            <td> {bid.bidsName}</td>
                                            <td> {bid.email}</td>
                                            <td> {bid.mobile}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default DetailCopy;