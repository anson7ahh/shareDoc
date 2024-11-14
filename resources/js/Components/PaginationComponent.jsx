import * as React from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { memo } from 'react';

const PaginationOutlined = ({ count, page, onChange }) => {
    return (
        <Stack spacing={2}>
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                shape="rounded"
                variant="outlined"
                color="primary"
            />
        </Stack>
    );
}
export default memo(PaginationOutlined)