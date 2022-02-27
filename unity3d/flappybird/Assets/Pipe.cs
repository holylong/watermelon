using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pipe : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        this.GeneratePosition();
    }

    public void GeneratePosition()
    {
        float pos_y = Random.Range(-1.0f, 1.0f);
        this.transform.localPosition = new Vector3(this.transform.localPosition.x, 
            this.transform.localPosition.y * pos_y, this.transform.localPosition.z);
    }
}
