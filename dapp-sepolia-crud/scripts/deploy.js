async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  const Crud = await ethers.getContractFactory('Crud');
  const crud = await Crud.deploy();
  await crud.deployed();

  console.log('Crud deployed to:', crud.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
