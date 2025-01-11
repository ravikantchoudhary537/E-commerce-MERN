import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "./image-upload";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useFetchAllProductsQuery,
} from "@/store/auth-slice/productapi";
import AdminProductTile from "./product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salesPrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { productList, isLoadingofadminproducts } = useSelector(
    (state) => state.adminProducts
  );
  const {
    data: allProductData,
    isLoading,
    refetch: refetchAllProductData,
  } = useFetchAllProductsQuery();
  // console.log("product list", productList);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentEditedId !== null) {
        const editResult = await editProduct({
          id: currentEditedId,
          updatedData: formData,
        }).unwrap();
        if (editResult?.success) {
          await refetchAllProductData();
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          toast({
            title: "Product edited successfully",
            variant: "success",
          });
        }
      } else {
        const result = await addProduct({
          ...formData,
          image: uploadedImageUrl,
        }).unwrap();
        if (result.success) {
          setOpenCreateProductsDialog(false);
          setImageFile(null);
          setFormData(initialFormData);
          await refetchAllProductData();
          // console.log(result, "add data result");
          toast({
            title: "Product added successfully",
            variant: "success",
            
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Failed to save product",
        description: error.message || "Something went wrong",
        variant: "error",
      });
    }
    // console.log("All products ", allProductData);
  };

  const handleDelete = async (getCurrentProductId) => {
    try {
      const deleteResult = await deleteProduct(getCurrentProductId).unwrap();
      
      // console.log("deleted data ",deleteResult)
      if(deleteResult?.success){
        await refetchAllProductData();
        toast({
          title:"Product deleted successfully",
          variant:"success",
          position:"left-bottom"
        })
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem, index) => (
              <AdminProductTile
                key={index}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              // isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
