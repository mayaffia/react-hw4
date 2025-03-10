export interface Product {
    id: number,
    name: string,
    description: string,
    category: string,
    quantity: number,
    unit: string,
    image: string,
    price: number
}

export interface ProductState {
    products: Product[];
}

export interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

export interface ModalProps {
    product: Product;
    onClose: () => void;
    open: boolean;
}

export interface ProductListProps {
    category: string;
    name: string;
    inStock: boolean;
    darkTheme?: boolean;
}

export interface NavBarProps {
    handleDrawerOpen?: () => void;
}

export interface MainContentProps {
    darkTheme?: boolean;
}

export interface Category {
    id: string;
    name: string;
}

