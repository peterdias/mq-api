const k8s = require('@kubernetes/client-node');

async function main () {
    const kc = new k8s.KubeConfig();
    kc.loadFromFile('./config/kconfig.yaml');
    
    const cluster = {
        'name': 'do-blr1-ts-cluster',
        'server': 'https://7eec650e-e675-4f03-bfe8-a0838f2c60d6.k8s.ondigitalocean.com',        
    };
    
    const user = {
        name: 'do-blr1-ts-cluster-admin',
        password: 'dop_v1_3cd8e73e645ffa1ad42fd3fee58160e77b6bc5e0c4fbb5ac0a59eb967abf8940',
        user: {token: 'dop_v1_3cd8e73e645ffa1ad42fd3fee58160e77b6bc5e0c4fbb5ac0a59eb967abf8940'}
    };

    const context = {
        name: 'do-blr1-ts-cluster',
        user: user.name,
        cluster: cluster.name,
    };

    const conf = {
        clusters: [cluster],
        users: [user],
        contexts: [context],
        currentContext: context.name,
    }

    //kc.loadFromOptions(conf);

    console.log(conf)
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
   
    // const pcontainer = new k8s.V1Container();
    // pcontainer.name = 'ts'
    // pcontainer.image= 'registry.digitalocean.com/metaquest/ts:6967d69'
    // pcontainer.env =[{name: 'BID', value : '6363668a5026731f4e001fb5'}]

    // const podSpec = new k8s.V1PodSpec
    // podSpec.containers = [pcontainer]

    // const meta = new k8s.V1ObjectMeta
    // meta.name =  "bot-6363668a5026731f4e001fb5"
    // meta.namespace = 'default'

    // const podBody = new k8s.V1Pod
    // podBody.kind = 'Pod'
    // podBody.metadata= meta

    // podBody.spec = podSpec
    
    //k8sApi.createNamespacedPod('default',podBody)

    // k8sApi.listNamespacedPod('default')
    // .then((res) => {
    //     res.body.items.forEach(pod => {
    //         console.log(pod.metadata.name)
    //     });
    // });

    const res = await k8sApi.listNamespacedPod('default')

    if(res)
    {
        const pods = res.body.items 
        pods.forEach(pod => {
            console.log(pod.metadata.name)
        });
    }

    //k8sApi.deleteNamespacedPod('bot-6363668a5026731f4e001fb5','default')
}

main()