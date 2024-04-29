"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { Flashlight, Loader } from "lucide-react";

function EditListing({ params }) {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [listing, setListing] = useState({});

  useEffect(() => {
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .eq("id", params?.id)
      .select();

    if (data) {
      setListing(data?.[0]);
    }
    if (data?.length <= 0) {
      router.replace("/");
    }
    if (error) {
      toast(`Server side error: ${error.message}`);
    }
  };

  const onSubmitHandler = async (formValue) => {
    setIsSubmitLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params?.id)
      .select();
    if (data) {
      setIsSubmitLoading(false);
      toast("Listing updated and published");
    }
    if (error) {
      setIsSubmitLoading(false);
      toast(`Server side error: ${error.message}`);
    }
  };

  return (
    <div className="mt-28 px-10 md:px-36">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
        }}
        onSubmit={(values) => {
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    name="type"
                    onValueChange={(v) => (values.type = v)}
                    defaultValue={listing?.type}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Select
                    name="propertType"
                    onValueChange={(v) => (values.propertyType = v)}
                    defaultValue={listing?.propertyType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          listing?.propertyType
                            ? listing?.propertyType
                            : "Select Property Type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Input
                    type="number"
                    placeholder="EX.2"
                    name="bedroom"
                    onChange={handleChange}
                    defaultValue={listing?.bedroom}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bathroom</h2>
                  <Input
                    type="number"
                    placeholder="EX.2"
                    name="bathroom"
                    onChange={handleChange}
                    defaultValue={listing?.bathroom}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Built In</h2>
                  <Input
                    type="number"
                    placeholder="EX.1900 Sq.ft"
                    name="builtIn"
                    onChange={handleChange}
                    defaultValue={listing?.builtIn}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input
                    type="number"
                    placeholder="EX.2"
                    name="parking"
                    onChange={handleChange}
                    defaultValue={listing?.parking}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Lot Size (Sq.ft)</h2>
                  <Input
                    type="number"
                    placeholder="EX.2"
                    name="lotSize"
                    onChange={handleChange}
                    defaultValue={listing?.lotSize}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Area (Sq.ft)</h2>
                  <Input
                    type="number"
                    placeholder="EX.1900 Sq.ft"
                    name="area"
                    onChange={handleChange}
                    defaultValue={listing?.area}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Selling Price ($)</h2>
                  <Input
                    type="number"
                    placeholder="400000"
                    name="price"
                    onChange={handleChange}
                    defaultValue={listing?.price}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Hoa</h2>
                  <Input
                    type="number"
                    placeholder="100"
                    name="hoa"
                    onChange={handleChange}
                    defaultValue={listing?.hoa}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Description</h2>
                  <Textarea
                    placeholder=""
                    name="description"
                    onChange={handleChange}
                    defaultValue={listing?.description}
                  />
                </div>
              </div>
              <div className="flex gap-7 justify-end mt-10">
                <Button disabled={isSubmitLoading} variant="outline">
                  {isSubmitLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button disabled={isSubmitLoading}>
                  {isSubmitLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Save & Publish"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
