import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function BasicBreadcrumbs({ AncestorsAndSelf }) {
    return (
        <div role="presentation" >
            <Breadcrumbs aria-label="breadcrumb" separator=">>">
                <Link className="text-lg font-bold text-blue-600 hover:text-blue-800"
                    underline="hover" color="inherit" href='/'>
                    Trang chu
                </Link>
                {AncestorsAndSelf.map((ancestor, index) => (
                    <div key={index}>
                        <Link className="text-lg font-bold text-blue-600 hover:text-blue-800"
                            underline="hover" color="inherit" href={`${ancestor.id}`} >
                            {ancestor.name}
                        </Link>
                    </div>
                ))}
            </Breadcrumbs>
        </div>
    );
}
