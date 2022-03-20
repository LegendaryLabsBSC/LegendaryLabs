import { client } from "@/components/apollo-client/apollo-client";
import { legendsNFTContract } from "@/config/legendary-labs-contracts";
import RETRIEVE_IPFS_HASH from "@/graphql/retrieve-ipfs-hash";

export async function hatchLegend(legendId: string) {
  console.log(legendId, "good");

  try {
    // const { data }: any = await client.mutate({
    //   mutation: RETRIEVE_IPFS_HASH,
    //   variables: {
    //     legendId: legendId,
    //   },
    // });

    const testingIPFSHashes: string[] = [
      "ipfs://Qmdfu75atsiuCfzj5qWxkMfbaDG52jWbrKdA2TbLT8X53C",
      "ipfs://QmXajsEdv8BpWUVu2FC3wcgiV8RV153uFn93nSCwnrBxv9",
      "ipfs://QmZcVbYmLTuZF8CWg9m9GXh1hRGqoRQ6aLpx7e3v1rd2qf",
      "ipfs://QmV7yDmra63FAPzF3d4wGo7oqogz4AvGzvQvr1rKy2WfFv",
      "ipfs://QmQTTf2NH1XWYUyh8Xom3AhQr957QqXksP3umjCNbn2RAf",
      "ipfs://Qmcjz8cQqCv78q7nrz1Y985AgNW5HZ713eTueD6jCNLh4o",
      "ipfs://QmdG6WFdAUYnPCVRkgzGZgRzJ27hYXFfCMn9gzSE2Qq1Aa",
      "ipfs://QmZJZGrckV3AC5ukp8KZkDSo7aMGFhqKiMK6iuhW9uSFAC",
      "ipfs://Qmbsp8ZmbL2Qo9DsvSem7Q9pYF8wZbsz8TZouQzHg7WTfP",
      "ipfs://QmWyBPEer562kSY4SP7kkY1d7reSwaQUbjdB3H6YpZyVqr",
      "ipfs://QmfLaaXnX31tMcPYYtbKAoYcEVgfCwCGG3N7PnCB4KepHV",
      "ipfs://QmUmp34MXsBYdN69MGq5EmGxFGzTNc3uxEfmCkYgcJrCHT",
      "ipfs://QmNymdF4NAMdyeb5ZPSe9YRbtt3jXpEBMhRKBGyhZZhTsz",
      "ipfs://QmNQoQoFbvaAN5Tt66xvJ2K2qNaBVjJ9o1jwktXEQetzu4",
      "ipfs://QmVxEGZ4zLCxAiRmXJQwtEAgx9GUSyfKZuu3VoLoLGPA9L",
      "ipfs://QmaG5V5YPybQ4KV4cMQfQRsZpw4cbt1T73rtPqHgLgezQR",
      "ipfs://QmcgzES8GbREo9TD3ZhK747kkE9aizifhnf1U4jLaXbYkT",
      "ipfs://QmaYZMSD9sfW2DZremqFRDk14CUyXR5KSuMB3kuRCXva1f",
      "ipfs://QmPB2wyaHBCXrwLDk8NhcffDzLCBQR5eBkpEtsi4NZdEAo",
    ];

    function getRandomIntInclusive(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const temp_ipfsHash = testingIPFSHashes[getRandomIntInclusive(0, 18)];

    await legendsNFTContract.hatchLegend(legendId, temp_ipfsHash);
  } catch (error) {
    console.log(error);
  }
}
