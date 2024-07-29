import { ChangeEvent, FC } from "react";
// components
import CheckBox from "../fields/CheckBox";
import Dropdown from "../fields/Dropdown";
import InputField from "../fields/InputField";
import BasicDatePicker from "../fields/BasicDatePicker";
// store
import { AddProductDetailsFormProps } from "./type";
import { FormDataPurchase, usePurchaseStore } from "@/store/purchaseStore";
import dayjs from "dayjs";

const AddProductDetailsForm: FC<AddProductDetailsFormProps> = ({
  enableOrder = false,
  formDropdownFieldsData = [],
  formInputFieldsData = [],
  handleSubmit,
  disableCheckBox = false,
}) => {
  const {
    formData,
    setFormData,
    setIsChecked,
    isChecked,
    setIsFormValid,
    isFormValid,
  } = usePurchaseStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
    setIsFormValid();
  };

  const handleChangeDropDown = (name: string, value: string) => {
    setFormData(name, value);
    setIsFormValid();
  };

  /**
   * TSX
   */
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
      <div className="w-full flex gap-2">
        <BasicDatePicker
          width="100%"
          value={formData.date}
          setDateChange={(value) =>
            setFormData("date", dayjs(value).format("YYYY-MM-DD"))
          }
        />

        {enableOrder && (
          <div className="flex  gap-2">
            {isChecked && (
              <InputField
                id={"orderId"}
                width={"100%"}
                label={"Order ID"}
                value={formData.orderId}
                handleChange={handleInputChange}
                placeholder={"enter order ID"}
              />
            )}
            {!disableCheckBox && (
              <CheckBox
                width="30%"
                isChecked={isChecked}
                setChecked={() => {
                  setIsChecked(!isChecked);
                  setIsFormValid();
                }}
                label="add orderId"
              />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between gap-2">
        {formDropdownFieldsData?.map((field, idx) => (
          <Dropdown
            key={idx}
            id={field.id}
            width={field.width}
            label={field.label}
            value={formData[field.id as keyof FormDataPurchase].toString()}
            options={field.options ? field.options : []}
            setInputChange={(value: string) => {
              handleChangeDropDown(field.id, value);
            }}
          />
        ))}
      </div>
      <div className="flex justify-between gap-2">
        {formInputFieldsData.map((field, idx) => (
          <div key={idx} style={{ width: field.width }}>
            {field.type === "input" ? (
              <InputField
                id={field.id}
                width={"100%"}
                label={field.label}
                type={field.inputField}
                value={formData[field.id as keyof FormDataPurchase]}
                handleChange={handleInputChange}
                placeholder={field.placeholder ? field.placeholder : ""}
              />
            ) : (
              <Dropdown
                id={field.id}
                width={"100%"}
                label={field.label}
                options={field.options ? field.options : []}
                value={formData[field.id as keyof FormDataPurchase].toString()}
                setInputChange={(value: string) => {
                  handleChangeDropDown(field.id, value);
                }}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className="disabled:bg-slate-300 bg-mediumDark text-white py-3 rounded-sm shadow-md"
      >
        submit
      </button>
    </form>
  );
};

export default AddProductDetailsForm;
