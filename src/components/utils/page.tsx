import {Pagination} from 'react-bootstrap';
import React from "react";

export type PageNavValue = {
    Id: string;
    Count: number;
    CurPage: number;
    Size: number;
    Link: string;
}
export const PageNav = (p: PageNavValue) => {
    const {Id, Count, CurPage, Size, Link} = p;

    const isFirstPage = CurPage === 1;
    const lastPage = Math.ceil(Count / Size)
    const isLastPage = CurPage === lastPage;

    const getPaginationItems = () => {
        const paginationItems = [];

        // Pagination.First Pagination.Prev
        paginationItems.push(<Pagination.First key={`${Id}-first`} disabled={isFirstPage} href={`${Link}?page=${1}`}/>);
        paginationItems.push(<Pagination.Prev key={`${Id}-prev`} disabled={isFirstPage} href={`${Link}?page=${CurPage - 1}`}/>);

        // Middle elements
        const maxDisplayedPages = 7;
        let startPage = Math.max(1, CurPage - Math.floor(maxDisplayedPages / 2));
        let endPage = Math.min(lastPage, startPage + maxDisplayedPages - 1);

        if (endPage - startPage < maxDisplayedPages - 1) {
            startPage = Math.max(1, endPage - maxDisplayedPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i <= lastPage) {
                paginationItems.push(<Pagination.Item key={`${Id}-page-${i}`} active={i === CurPage} href={`${Link}?page=${i}`}>{i}</Pagination.Item>);
            }
        }

        // Pagination.Next Pagination.Last
        paginationItems.push(<Pagination.Next key={`${Id}-next`} disabled={isLastPage} href={`${Link}?page=${CurPage + 1}`}/>);
        paginationItems.push(<Pagination.Last key={`${Id}-last`} disabled={isLastPage} href={`${Link}?page=${Math.ceil(Count / Size)}`}/>);
        return paginationItems;
    };

    return <Pagination>{getPaginationItems()}</Pagination>;
};
