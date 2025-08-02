"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import SelectField from "@/components/ui/select-field";
import TextField from "@/components/ui/text-field";
import { productService } from "@/lib/services/product";


const productSchema = z.object({
    title: z.string().min(3, "Title should be at least 3 characters long"),
    price: z.number("Price is required"),
    description: z.string().optional(),
    category: z.string().min(1, "Please select a category"),
    imgUrl: z.url("Please provide a valid image url"),
});

export type ProductInputs = z.infer<typeof productSchema>;

export default function AddProduct() {

    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: productService.getCategories,
        staleTime: 1000 * 60 * 10,
    })

    const form = useForm({
        criteriaMode: "all",
        defaultValues: {
            title: "",
            category: "",
            description: "",
            imgUrl: "",
            price: undefined,
        },
        resolver: zodResolver(productSchema),
    });


    const productMutation = useMutation({
        mutationFn: productService.create,
        onSuccess: () => {
            toast.success("Product added successfully");
            form.reset();
        },
        onError: (err) => {
            toast.error(err.message || "Something went wrong");
        }
    })

    async function onSubmit(data: ProductInputs) {
        productMutation.mutate(data);
    }


    return (
        <section className="min-h-1/2">
            <div className="size-full flex flex-col gap-5 items-center justify-center">

                <h1 className="text-2xl lg:text-3xl mt-5">Create Product Form</h1>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full max-w-3xl border border-gray-200 bg-card px-4 py-6 lg:p-8 rounded-md shadow-sm"
                >
                    <TextField<ProductInputs>
                        name="title"
                        register={form.register}
                        as="input"
                        error={form.formState.errors.title?.message}
                    />

                    <SelectField<ProductInputs>
                        name="category"
                        register={form.register}
                        options={categories.data || []}
                        placeholder={categories.isLoading ? "Loading categories..." : "Choose a category..."}
                        disabled={categories.isLoading}
                        error={form.formState.errors.category?.message}
                    />
                    <TextField<ProductInputs>
                        name="price"
                        register={form.register}
                        type="number"
                        error={form.formState.errors.price?.message}
                        inputProps={{
                            min: 0,
                            max: Number.MAX_SAFE_INTEGER
                        }}
                        rules={{
                            min: 0,
                            valueAsNumber: true,
                        }}
                    />
                    <TextField<ProductInputs>
                        name="description"
                        register={form.register}
                        as="textarea"
                        required={false}
                        error={form.formState.errors.description?.message}
                    />
                    <TextField<ProductInputs>
                        label="Image Url"
                        register={form.register}
                        name="imgUrl"
                        error={form.formState.errors.imgUrl?.message}
                    />

                    <button
                        className="bg-black hover:bg-black/90 w-full text-center py-3 px-2 text-white uppercase font-semibold tracking-wider rounded-md cursor-pointer focus-visible:outline-gray-800 focus-visible:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={productMutation.isPending}
                    >
                        {productMutation.isPending && (
                            <>
                                <Loader2Icon className="animate-spin size-5 mr-2" aria-hidden="true" />
                                <span className="sr-only">Submitting...</span>
                            </>
                        )}
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}