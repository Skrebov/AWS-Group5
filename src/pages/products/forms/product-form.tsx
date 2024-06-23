import Heading from '@/components/shared/heading';
import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Product} from "../../../../amplify/utils/model.ts";
import {FunctionComponent} from "react";
import {addProduct, updateProduct} from "../../../../amplify/utils/queryUtils.ts";

const productFormSchema = z
    .object({
        category: z.string().min(1, {message: 'category is required'}),
        //category: z.enum(['Category 1', 'Category 2', 'Category 3']),
        name: z.string().min(1, {message: 'name is required'}),
        price: z.string().min(1, {message: 'price is required'}),
        quantity: z.coerce.number(),
        pk: z.string().min(10, {message: 'pk is required'}),
        sk: z.string().min(10, {message: 'sk is required'})
    });

type ProductFormSchemaType = z.infer<typeof productFormSchema>;

type Props = {
    initialValues?: Product;
    closeModal: () => void;
    onSubmitNotify: (data: Product) => void;
    mode: 'create' | 'edit';
};

const ProductForm: FunctionComponent<Props> = ({
                                                         initialValues,
                                                         closeModal,
                                                         onSubmitNotify,
                                                         mode,
                                                     }) => {
    const form = useForm<ProductFormSchemaType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            category: initialValues?.category || '',
            name: initialValues?.name || '',
            price: initialValues?.price || '',
            quantity: initialValues?.quantity || 0,
            pk: initialValues?.pk || '',
            sk: initialValues?.sk || '',
        }
    });

    const onSubmit = async (values: ProductFormSchemaType) => {

        let response:Product;
        if (mode === 'create') {
            // create response
            response = await addProduct(values.pk, values.sk, values.category, values.name, values.price, values.quantity)
        } else {
            // update response
            response = await updateProduct(values.pk, values.sk, values.category, values.name, values.price, values.quantity)
        }
        if (response) {
            onSubmitNotify(response);
            closeModal();
        }
    };

    return (
        <div className="px-2">
            <Heading
                title={mode === 'create' ? 'Create Product' : 'Update Product'}
                className="space-y-2 py-4 text-center"
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <FormField
                            control={form.control}
                            name="pk"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter pk"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sk"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter sk"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter category"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter name"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter price"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter quantity"
                                            type={"number"}
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <Button
                            type="button"
                            variant="secondary"
                            className="rounded-full bg-gray-400 hover:bg-gray-500 text-white"
                            size="lg"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="rounded-full" size="lg">
                            {mode === 'create' ? 'Create': 'Update'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProductForm;