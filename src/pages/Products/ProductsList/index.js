import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fadeInDown } from 'react-animations';
import './Products.scss';
import { API_URL } from '../../../utils/config';
import axios from 'axios';

import { FaSearch, FaUser } from 'react-icons/fa';
//元件
import { Dropdown } from 'bootstrap';
import BreadcrumbForProductsList from '../components/BreadcrumbForProductsList';
import AsideForProductsList from '../components/AsideForProductsList';

//動畫
import { motion } from 'framer-motion';
import { ListMotionContainer, ListMotionItem } from './ListMotion';

function ProductsList() {
  //排序選單用
  const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
  const dropdownList = [...dropdownElementList].map(
    (dropdownToggleEl) => new Dropdown(dropdownToggleEl)
  );

  const [isVisibled, setIsVisable] = useState(false);

  //正式資料
  const { mainCategory, subCategory } = useParams();
  //從資料庫撈出來的原始資料
  const [allProducts, setAllProducts] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('');

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(0);

  //一開始讀到的分類資料
  useEffect(() => {
    setIsVisable(true);
  }, []);

  useEffect(() => {
    let getAllProducts = async () => {
      let response = await axios.get(
        `${API_URL}/products?category=${
          subCategory ? subCategory : mainCategory
        }`
      );
      setAllProducts(response.data.data);
      setTotalPage(response.data.pagination.totalPage);
      setAmount(response.data.pagination.productsTotal);
      setPage(1);
      setOrder('');
      setSearch('');
    };
    getAllProducts();
  }, [mainCategory, subCategory]);
  // console.log('visible', isVisibled);

  //(頁面和總體)資料篩選或變動
  useEffect(() => {
    // console.log('search', search);
    // console.log('page', page);
    let getSearchProducts = async () => {
      // console.log('API_URL', API_URL);
      let response = await axios.get(
        `${API_URL}/products?category=${
          subCategory ? subCategory : mainCategory
        }&search=${search}&order=${order}&page=${page}`
      );
      // console.log('Category', mainCategory, subCategory);
      // console.log('response.data', response.data);
      setAllProducts(response.data.data);
      setTotalPage(response.data.pagination.totalPage);
      setAmount(response.data.pagination.productsTotal);
    };
    getSearchProducts();
  }, [search, order, page]);

  // 頁數
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li
          className={
            page === i ? 'active  page-item page-link ' : 'page-item page-link '
          }
          key={i}
          onClick={(e) => {
            setPage(i);
            goToTop();
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="product_list">
      <div className="container ">
        {/* 麵包屑*/}
        <BreadcrumbForProductsList
          mainCategory={mainCategory}
          subCategory={subCategory}
        />
        {/* TODO:content要改CSS */}
        <div className=" product_list-container d-flex justify-content-center ">
          {/* 側欄選單 待測試 */}
          <AsideForProductsList setIsVisable={setIsVisable} />
          <div className="products_list-content col-lg-9 ">
            <div className="products_list-category-product-box  ">
              <div className="products_list-category-title ">
                {/* 商品種類標題 */}
                <h2>
                  {subCategory ? subCategory : mainCategory}
                  {search !== '' ? ' - 搜尋"' + search + '"' : ''}
                </h2>
              </div>
              <div className="products_list-order_search ">
                <p className="col-4 text-end">共 {amount} 件商品</p>
                {/* 篩選器 */}
                <span className="dropdown  ">
                  <button
                    className="btn products_list-btn btn-secondary dropdown-toggle products_list-dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {order === '' ? '預設排序' : order}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setOrder('價錢由高到低');
                          setPage(1);
                        }}
                      >
                        價錢由高到低
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setOrder('價錢由低到高');
                          setPage(1);
                        }}
                      >
                        價錢由低到高
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setOrder('上市日期由新到舊');
                          setPage(1);
                        }}
                      >
                        上市日期由新到舊
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setOrder('上市日期由舊到新');
                          setPage(1);
                        }}
                      >
                        上市日期由舊到新
                      </button>
                    </li>
                  </ul>
                </span>
                <div className="input-group  products_list-input-group">
                  <input
                    id="list-search"
                    value={inputValue}
                    type="text"
                    className="form-control products_list-search-input"
                    placeholder="搜尋"
                    aria-label="搜尋"
                    aria-describedby="button-addon2"
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSearch(inputValue);
                      }
                      setPage(1);
                      setInputValue('');
                    }}
                  />
                  <button
                    className="products_list-search"
                    type="submit"
                    id="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const inputVal =
                        document.querySelector('#list-search').value;
                      setSearch(inputVal);
                      setPage(1);
                      setInputValue('');
                    }}
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>
            {/* 商品列表 */}
            {allProducts.length === 0 ? (
              <h2>查無結果</h2>
            ) : (
              <ListMotionContainer
                element="ul"
                visible={isVisibled}
                className="d-flex row products_list-card-list gy-3 justify-content-start "
              >
                {allProducts.map((item, index) => {
                  return (
                    <ListMotionItem
                      key={item.id}
                      element="li"
                      noShift
                      className={
                        item.stock === '0'
                          ? ' products_list-card  my-3 col-6 col-lg-4  d-flex flex-column  align-items-center '
                          : '  my-3 col-6 col-lg-4  d-flex flex-column  align-items-center no-stock'
                      }
                    >
                      <img
                        className="productList_product_pic"
                        src={require(`../../../Assets/products/${item.image}`)}
                        alt=""
                      />
                      <div className="  py-2 ">
                        <Link
                          className=" card-title products_list-card-title word-wrap"
                          to={`/productDetail/${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className=" my-2 text-primary products_list-card-text">
                        <em className="add-on text-primary">NT${item.price}</em>
                      </div>
                    </ListMotionItem>
                  );
                })}
              </ListMotionContainer>
            )}
          </div>
        </div>
        {/* 頁數元件化? */}
        <nav aria-label="Page navigation ">
          <ul className="pagination recipe-pagination">
            <li
              className="page-item "
              aria-label="Previous"
              onClick={(e) => {
                setPage(page - 1 < 1 ? 1 : page - 1);
                goToTop();
              }}
            >
              <span className="page-link" aria-hidden="true">
                &laquo;
              </span>
            </li>
            {getPages()}
            <li
              className="page-item "
              aria-label="Next"
              onClick={() => {
                setPage(page + 1 > totalPage ? totalPage : page + 1);
                goToTop();
              }}
            >
              <span className="page-link" aria-hidden="true">
                &raquo;
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProductsList;
