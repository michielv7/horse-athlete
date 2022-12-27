import { DetailedOrderType } from '#/lib/types/orderOverview';
import { CustomInput } from '#/ui/CustomInput';

export const OrderDetail = ({ order }: { order: DetailedOrderType }) => (
  <div>
    <h1 className="col-span-2 m-3 text-center text-2xl font-bold">
      Order nr: {order.id.toString()}
    </h1>

    <div className="grid grid-cols-2 gap-4 rounded-md bg-slate-600 pb-5 text-white">
      <div className="grid grid-flow-row gap-3 px-4">
        <h2 className="mt-5 block pb-2 text-center text-xl font-bold">
          Information
        </h2>
        <div className="flex flex-row flex-wrap border p-5">
          <div className=" mr-3 w-64">
            <CustomInput
              htmlFor="customersName"
              type="text"
              label="Customer's Name"
              id="customersName"
              name="customersName"
              value={order.attributes.orderAttributes['customersName']}
              disabled={true}
            />
          </div>
          <div className="mr-3 w-32">
            <CustomInput
              htmlFor="customersEmail"
              type="text"
              label="Customer's Email"
              id="customersEmail"
              name="customersEmail"
              value={order.attributes.orderAttributes['email']}
              disabled={true}
            />
          </div>
          <div className="mr-3">
            <CustomInput
              htmlFor="statusName"
              type="text"
              label="Status"
              id="statusName"
              name="statusName"
              value={order.attributes.orderStatus.data.attributes.statusName}
              disabled={true}
            />
          </div>
          <div className="mt-3 mr-3 w-64">
            <CustomInput
              htmlFor="createdAt"
              type="text"
              label="Created At"
              id="createdAt"
              name="createdAt"
              value={order.attributes.createdAt}
              disabled={true}
            />
          </div>
          <div className="mt-3 mr-3 w-64">
            <CustomInput
              htmlFor="updatedAt"
              type="text"
              label="Updated At"
              id="updatedAt"
              name="updatedAt"
              value={order.attributes.updatedAt}
              disabled={true}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-flow-row gap-3">
        <h2 className="mt-5 block text-center text-xl font-bold">
          Saddle Information
        </h2>
        <div className="mr-5 flex flex-row  flex-wrap border p-5">
          <div className="mr-3 w-64">
            <CustomInput
              htmlFor="saddleName"
              type="text"
              label="Saddle Name"
              id="saddleName"
              name="saddleName"
              value={order.attributes.saddle.data.attributes.name}
              disabled={true}
            />
          </div>
          <div className="mr-3 w-96">
            <CustomInput
              htmlFor="saddleDescription"
              type="text"
              label="Saddle Description"
              id="saddleDescription"
              name="saddleDescription"
              value={order.attributes.saddle.data.attributes.description}
              disabled={true}
            />
          </div>
          <div className="mt-3 w-64">
            <CustomInput
              htmlFor="basePrice"
              type="text"
              label="Base Price"
              id="basePrice"
              name="basePrice"
              value={'€ ' + order.attributes.saddle.data.attributes.basePrice}
              disabled={true}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-2 grid gap-3">
        <h2 className="mt-5 text-center text-xl font-bold">
          Saddlefitter Information
        </h2>
        <div className="px-4">
          <div className="flex flex-row flex-wrap justify-center gap-3 border p-5">
            <div className="w-64">
              <CustomInput
                htmlFor="saddleFitterUsername"
                type="text"
                label="Saddlefitter Username"
                id="saddleFitterUsername"
                name="saddleFitterUsername"
                value={order.attributes.saddleFitter.data?.attributes.username}
                disabled={true}
              />
            </div>
            <div className="w-64">
              <CustomInput
                htmlFor="saddleFitterEmail"
                type="text"
                label="Saddlefitter Email"
                id="saddleFitterEmail"
                name="saddleFitterEmail"
                value={order.attributes.saddleFitter.data?.attributes.email}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 row-span-2 grid gap-3">
        <h2 className="mt-5 pb-2 text-center text-xl font-bold">
          Additional Information
        </h2>
        <div className="px-4">
          <div className="flex flex-row flex-wrap justify-evenly border">
            {Object.entries(order.attributes.orderAttributes).map((attr, i) => (
              <div key={i} className="w-64 p-5">
                <CustomInput
                  key={attr[0]}
                  htmlFor="saddleFitterEmail"
                  type="text"
                  label={attr[0]}
                  id="saddleFitterEmail"
                  name="saddleFitterEmail"
                  value={attr[1]}
                  disabled={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
