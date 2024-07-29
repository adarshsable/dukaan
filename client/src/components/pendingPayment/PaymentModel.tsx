import dayjs from "dayjs";
import { ChangeEvent, FormEvent } from "react";
// components
import Dropdown from "../fields/Dropdown";
import BasicModal from "../model/BasicModel";
import InputField from "../fields/InputField";
import BasicDatePicker from "../fields/BasicDatePicker";
// store
import { usePendingPaymentStore } from "@/store/pendingPaymentStore";
import { paymentModeOptions } from "./func";

const PaymentModel = ({
  handleSubmitForm,
}: {
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  const {
    setReset,
    isFormValid,
    setIsFormValid,
    formData,
    setFormData,
    isPaymentModelOpen,
  } = usePendingPaymentStore();

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
    <div>
      <BasicModal
        modalHeight="18rem"
        modalWidth="45rem"
        title="Add Payment"
        isOpen={isPaymentModelOpen}
        onClose={setReset}
      >
        <form
          onSubmit={handleSubmitForm}
          className="w-full flex flex-col items-center gap-6"
        >
          <div className="w-full flex items-center gap-3">
            {/* date */}
            <BasicDatePicker
              width="100%"
              value={formData.date}
              setDateChange={(value) =>
                setFormData("date", dayjs(value).format("YYYY-MM-DD"))
              }
            />
            {/* order id */}
            <InputField
              id={"order_id"}
              width={"100%"}
              label={"Order ID"}
              value={formData.order_id}
              handleChange={handleInputChange}
              placeholder={"enter order ID"}
            />
          </div>
          <div className="w-full flex items-center gap-3">
            {/* payment */}
            <InputField
              type="number"
              id={"payment"}
              width={"100%"}
              label={"Payment"}
              value={formData.payment}
              handleChange={handleInputChange}
              placeholder={"enter payment..."}
            />
            {/* payment mode */}
            <Dropdown
              id={"payment_mode"}
              width={"100%"}
              label="Payment Mode"
              value={formData.payment_mode}
              options={paymentModeOptions}
              setInputChange={(value: string) => {
                handleChangeDropDown("payment_mode", value);
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full disabled:bg-slate-300 bg-mediumDark px-4 py-2 shadow-md rounded-sm text-white hover:bg-slate-600"
          >
            Submit
          </button>
        </form>
      </BasicModal>
    </div>
  );
};

export default PaymentModel;
