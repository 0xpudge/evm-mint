"use client";

import { ethers } from "ethers";
import { config } from "~/config";
import { toast } from "react-toastify";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormData = {
  key: string;
  number: number;
  rpc: string;
  time: number;
};

export default function Start() {
  const [succes, setSucces] = React.useState(0);
  const [noSucces, setNopSucces] = React.useState(0);
  const [status, setStatus] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const { key, number, rpc, time } = data;
    setStatus(true);
    await scription({ key, number, rpc, time });
    setStatus(false);
  });
  async function scription({ key, number, rpc, time }: FormData) {
    const provider = rpc
      ? new ethers.JsonRpcProvider(rpc)
      : ethers.getDefaultProvider("goerli", [
          "https://ethereum-goerli.publicnode.com",
        ]);
    const wallet = new ethers.Wallet(key, provider);
    const address = await wallet.getAddress();
    console.log(`地址: ${address}`);
    setAddress(address);
    let nonce = await wallet.getNonce();
    for (let i = 1; i <= number; i++) {
      await new Promise((resolve) => setTimeout(resolve, time));
      const calldata = "data:,";
      const content = {
        a: "NextInscription",
        p: "oprc-20",
        op: "mint",
        tick: config.tick + "NI",
        amt: config.amt + "10000",
      };
      const newData = calldata + JSON.stringify(content);
      const calldataCode = ethers.hexlify(ethers.toUtf8Bytes(newData));

      const tx = {
        to: address,
        value: 0,
        data: "0x646174613a2c7b2270223a226772632d3230222c226f70223a226d696e74222c227469636b223a22676f7273222c22616d74223a223130227d",
        nonce: nonce++,
      };

      console.log(`第${i}次铸造......   nonce: ${nonce}`);
      wallet
        .sendTransaction(tx)
        .then((res) => {
          setSucces((succes) => succes + 1);
          console.log(`第${i}次铸造,返回值: ${res.hash}`); // console.dir(res)
          toast(`铸造成功, txHash: ${res.hash}`, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // console.log(`铸造成功, txHash: ${res.hash}`)
        })
        .catch((err) => {
          setNopSucces((noSucces) => noSucces + 1);
          console.log(`第${i}次铸造,发生错误: ${err} `);
          console.dir(err);
        });
    }
  }
  return (
    <form
      onSubmit={onSubmit}
      className="card w-auto gap-6 bg-base-100 p-8 text-sm shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="badge badge-ghost ">Alpha Hunter</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="badge badge-ghost">success</div>
            <div className="join-item text-success">{succes}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="badge badge-ghost">false</div>
            <div className="join-item text-primary">{noSucces}</div>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="RPC节点链接"
        className="input input-bordered w-full"
        {...register("rpc")}
      />
      <input
        type="text"
        placeholder="私钥"
        className="input input-bordered w-full"
        {...register("key")}
      />
      <input
        type="number"
        placeholder="数量"
        className="input input-bordered w-full"
        min={0}
        {...register("number")}
      />
      <input
        type="number"
        placeholder="延时(ms)"
        className="input input-bordered w-full"
        min={0}
        {...register("time")}
      />
      <div className="flex w-full justify-center">
        {status ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <button className={`btn btn-ghost btn-active w-full`} type="submit">
            Start
          </button>
        )}
      </div>
      <div className="mockup-code">
        <pre>
          <code>RPC节点: https://rpc.ankr.com/bsc</code>
        </pre>
      </div>
      <Link
        href={`https://bscscan.com/address/${address}`}
        className="btn-link stat-desc"
      >
        {address ? address : null}
      </Link>
      <Link
        href={"https://discord.gg/mEYypJUwk"}
        className="btn btn-ghost btn-active"
      >
        Join us
      </Link>
    </form>
  );
}
